const AWS = require('aws-sdk')
const path = require('path')
const fs = require('fs')
const aExec = require('await-exec')
const chalk = require('chalk')
const promptConfirm = require('prompt-confirm')
const awsKey = require('./aws-key.json')

const s3 = new AWS.S3({
  accessKeyId: awsKey.accessKeyId,
  secretAccessKey: awsKey.secretAccessKey,
})
const cloudFront = new AWS.CloudFront()
const bucket = {
  test: 'suhoshin', // staging
  prod: 'suhoshin', // production
}

const exec = async arg => await aExec(arg)
const log = arguments => console.log(arguments)
const print = o => log(o)
const success = o => log(chalk.green(o))
const failed = o => log(chalk.red(o))
const uploadArgs = env => ({
  buildOpt: env === 'test' ? 'build-test' : 'build',
  bucketName: bucket[env],
  uploadTargetDirectory: env === 'test' ? 'dist-test' : 'dist',
  cacheMaxAgeZero: env === 'test'
})

const build = async (buildOpt) => {
  if (!buildOpt) {
    return Promise.reject('build: buildOpt is not specified.')
  }
  print('run ' + buildOpt + '...\n')
  print('\n\n1. Started building...')
  const result = await exec('npm run ' + buildOpt)
  print(result.stdout)
  success('Build finished!')
  return Promise.resolve()
}

const createInvalidation = async () => {

  print('\n\n4. Invalidating previous cache...')

  const params = {
    DistributionId: 'EQ12YR5KEP45H', // user.vanillabridge.com dist ID(cloudfront 콘솔 페이지에서 직접 확인)
    InvalidationBatch: {
      CallerReference: String(new Date().getTime()), // 무조건 string으로 들어와야 하고 중복되면 안됨
      Paths: {
        Quantity: 4,
        Items: [
          '/css/*',
          '/js/*',
          '/img/*',
          '/index.html'
        ]
      }
    }
  }
  return new Promise((resolve, reject) => {
    cloudFront.createInvalidation(params, (err, data) => {
      if (err) {
        failed(err)
        reject()
      }
      else {
        success('cache invalidation finish')
        resolve()
      }
    })
  })
}

const uploadToS3 = async (bucketName, uploadTargetDirectory, cacheMaxAgeZero) => {
  if (!uploadTargetDirectory) {
    return Promise.reject('uploadToS3: uploadTargetDirectory is not specified.')
  }

  print('\n\n3. Distributing current version...')

  const readDir = (dir) =>
    fs.readdirSync(dir)
      .reduce((files, file) =>
          fs.statSync(path.join(dir, file)).isDirectory() ?
            files.concat(readDir(path.join(dir, file))) :
            files.concat(path.join(dir, file)),
        [])

  let bucketPath, params
  let uploaded = 0
  let filePaths = readDir(uploadTargetDirectory)

  return new Promise((resolve) => {
    filePaths.forEach(filePath => {
      filePath = filePath.replace(/\\/g, '/')
      bucketPath = filePath.substring(uploadTargetDirectory.length+1)

      params = {
        Bucket: bucketName,
        Key: bucketPath,
        Body: fs.readFileSync(filePath),
        ACL: 'public-read',
      }
      // if (cacheMaxAgeZero) {
      params.CacheControl = 'max-age=0'
      // }
      if (filePath.includes('.html')) {
        params.ContentType = 'text/html'
      }
      if (filePath.includes('.css')) {
        params.ContentType = 'text/css'
      }
      if (filePath.includes('.js')) {
        params.ContentType = 'application/javascript'
      }
      if (filePath.includes('.svg')) {
        params.ContentType = 'image/svg+xml'
      }
      s3.putObject(params, (err) => {
        if (err) {
          failed(err)
          return
        }
        success('successfully uploaded '+ filePath +' to ' + bucketName)
        uploaded++

        if (filePaths.length === uploaded) {
          return resolve()
        }
      })
    })
  })
}

const deletePreviousDistribution = async (bucketName) => {
  const help = () =>
    `It seems like you don't have AWS-CLI. Copy and paste and run these and try again:\n\n` +
    `curl 'https://s3.amazonaws.com/aws-cli/awscli-bundle.zip' -o 'awscli-bundle.zip'\n` +
    `unzip awscli-bundle.zip\n` +
    `sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws\n` +
    `rm -rf awscli-bundle\n` +
    `rm awscli-bundle.zip\n\n` +
    `You might refer to this:\nhttps://docs.aws.amazon.com/ko_kr/cli/latest/userguide/install-macos.html`

  if (!bucketName) {
    return Promise.reject('deletePreviousDistribution: bucketName is not specified.')
  }

  print('\n\n2. Started deleting previous distribution from S3...')

  let rmResult = await exec('aws s3 rm s3://' + bucketName + ' --recursive')
  if (rmResult.stderr) {
    return Promise.reject(help())
  }
  s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
    const contents = data.Contents
    contents.forEach(content => {
      s3.deleteObject({ Bucket: bucketName, Key: content.key })
    })
  })
  success('Bucket successfully got emptied!')
  return Promise.resolve()
}

const deploy = async (env) => {
  let o = uploadArgs(env)

  try {
    await build(o.buildOpt)
    // await deletePreviousDistribution(o.bucketName)
    await uploadToS3(o.bucketName, o.uploadTargetDirectory, o.cacheMaxAgeZero)

    // 리얼 배포 시에만 cloudFront cache invalidate 실행
    // if (!o.cacheMaxAgeZero) await createInvalidation()
    success('\n\nDeploy finished!')
  } catch (e) {
    failed(e)
  }
}

let arg = process.argv[2]
if (!arg || ['all', 'prod', 'test'].indexOf(arg) === -1) {
  print('Usage:)\n' +
    'node deploy [branch] => branch: all, prod, test\n' +
    'EX:) node deploy all')
  return
}

const TMI = arg === 'all' ? ' (This executes multiple deploys concurrently.)' : ''
confirm = new promptConfirm(`deploy ${arg}?` + TMI)
  .ask(yes => {
    if (yes) {
      if (arg === 'test' || arg === 'all') deploy('test')
      if (arg === 'prod' || arg === 'all') deploy('prod')
    } else {
      success(`Sure. Make sure everything is OK before deploying.`)
    }
  })
