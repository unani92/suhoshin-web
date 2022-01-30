import blankProfile from '@/assets/images/blank_profile.svg'

const onCoverImage = (el, bind) => {
    const imageUrl = bind.value
    el.setAttribute('style', `background-image: url('${imageUrl}'), url(${blankProfile})`)
}

export const imgCover = {
    bind: (el, bind) => onCoverImage(el, bind),
    update: (el, bind) => onCoverImage(el, bind),
}
