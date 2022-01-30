import ConsentPage from '@/routes/signup/ConsentPage'
import EmailPage from '@/routes/signup/basics/EmailPage'
import PasswordPage from '@/routes/signup/basics/PasswordPage'
import NicknamePage from '@/routes/signup/basics/NicknamePage'
import StatePage from '@/routes/signup/locations/StatePage'
import StationPage from '@/routes/signup/locations/StationPage'
import RegionPage from '@/routes/signup/locations/RegionPage'
import SchoolPage from '@/routes/signup/schools/SchoolPage'
import SchoolTypePage from '@/routes/signup/schools/SchoolTypePage'
import UniversityPage from '@/routes/signup/schools/UniversityPage'
import MajorPage from '@/routes/signup/schools/MajorPage'
import SchoolSelectAllPage from '@/routes/signup/schools/SchoolSelectAllPage'
import JobCategoryPage from '@/routes/signup/jobs/JobCategoryPage'
import CompanyPage from '@/routes/signup/jobs/CompanyPage'
import JobPage from '@/routes/signup/jobs/JobPage'
import BirthdayPage from '@/routes/signup/additional-profiles/BirthdayPage'
import GenderPage from '@/routes/signup/additional-profiles/GenderPage'
import HeightPage from '@/routes/signup/additional-profiles/HeightPage'
import KindsPage from '@/routes/signup/additional-profiles/KindsPage'
import ReligionPage from '@/routes/signup/additional-profiles/ReligionPage'
import ShapesPage from '@/routes/signup/additional-profiles/ShapesPage'
import SignupCheckPage from '@/routes/signup/additional-profiles/SignupCheckPage'
import SmokingPage from '@/routes/signup/additional-profiles/SmokingPage'
import UploadPhotoPage from '@/routes/signup/UploadPhotoPage'
import VerificationPage from '@/routes/signup/VerificationPage'
import AssetPage from '@/routes/signup/AssetPage'
import IncomePage from '@/routes/signup/IncomePage'
import IntroduceMyselfPage from '@/routes/signup/IntroduceMyselfPage'
import HomeAssetPage from '@/routes/signup/HomeAssetPage'
import MarryPlanPage from '@/routes/signup/MarryPlanPage'
import StartWithPhonePage from '@/routes/signup/StartWithPhonePage'

// onboard temp
import Height from '@/routes/signup/temp-signup/Height'
import Marriage from '@/routes/signup/temp-signup/Marriage'
import HaveChild from '@/routes/signup/temp-signup/HaveChild'
import MarryPlan from '@/routes/signup/temp-signup/MarryPlan'
import UseManager from '@/routes/signup/temp-signup/UseManager'
import State from '@/routes/signup/temp-signup/State'
import Station from '@/routes/signup/temp-signup/Station'
import Region from '@/routes/signup/temp-signup/Region'
import JobCategory from '@/routes/signup/temp-signup/JobCategory'
import School from '@/routes/signup/temp-signup/School'
import WhyDifficult from '@/routes/signup/temp-signup/WhyDifficult'

export default [
    {
        path: '/signup/consent',
        name: 'ConsentPage',
        component: ConsentPage,
    },
    {
        path: '/signup/basics/email',
        name: 'EmailPage',
        component: EmailPage,
    },
    {
        path: '/signup/basics/password',
        name: 'PasswordPage',
        component: PasswordPage,
    },
    {
        path: '/signup/basics/nickname',
        name: 'NicknamePage',
        component: NicknamePage,
    },
    {
        path: '/signup/locations/state',
        name: 'StatePage',
        component: StatePage,
    },
    {
        path: '/signup/locations/station',
        name: 'StationPage',
        component: StationPage,
    },
    {
        path: '/signup/locations/region',
        name: 'RegionPage',
        component: RegionPage,
    },
    {
        path: '/signup/schools/school',
        name: 'SchoolPage',
        component: SchoolPage,
    },
    {
        path: '/signup/schools/school-type',
        name: 'SchoolTypePage',
        component: SchoolTypePage,
    },
    {
        path: '/signup/schools/university',
        name: 'UniversityPage',
        component: UniversityPage,
    },
    {
        path: '/signup/jobs/job-category',
        name: 'JobCategoryPage',
        component: JobCategoryPage,
    },
    {
        path: '/signup/jobs/company',
        name: 'CompanyPage',
        component: CompanyPage,
    },
    {
        path: '/signup/jobs/job',
        name: 'JobPage',
        component: JobPage,
    },
    {
        path: '/signup/additional-profiles/birthday',
        name: 'BirthdayPage',
        component: BirthdayPage,
    },
    {
        path: '/signup/additional-profiles/gender',
        name: 'GenderPage',
        component: GenderPage,
    },
    {
        path: '/signup/additional-profiles/height',
        name: 'HeightPage',
        component: HeightPage,
    },
    {
        path: '/signup/additional-profiles/kinds',
        name: 'KindsPage',
        component: KindsPage,
    },
    {
        path: '/signup/additional-profiles/religion',
        name: 'ReligionPage',
        component: ReligionPage,
    },
    {
        path: '/signup/additional-profiles/shapes',
        name: 'ShapesPage',
        component: ShapesPage,
    },
    {
        path: '/signup/additional-profiles/signup-check',
        name: 'SignupCheckPage',
        component: SignupCheckPage,
    },
    {
        path: '/signup/additional-profiles/smoking',
        name: 'SmokingPage',
        component: SmokingPage,
    },
    {
        path: '/signup/upload-photo',
        name: 'UploadPhotoPage',
        component: UploadPhotoPage,
    },
    {
        path: '/signup/verification',
        name: 'VerificationPage',
        component: VerificationPage,
    },
    {
        path: '/signup/basics/asset',
        name: 'AssetPage',
        component: AssetPage,
    },
    {
        path: '/signup/basics/income',
        name: 'IncomePage',
        component: IncomePage,
    },
    {
        path: '/signup/basics/intro',
        name: 'IntroduceMyselfPage',
        component: IntroduceMyselfPage,
    },
    {
        path: '/signup/basics/home-asset',
        name: 'HomeAssetPage',
        component: HomeAssetPage,
    },
    {
        path: '/signup/basics/major',
        name: 'MajorPage',
        component: MajorPage,
    },
    {
        path: '/signup/basics/schoolAll',
        name: 'SchoolSelectAllPage',
        component: SchoolSelectAllPage,
    },
    {
        path: '/signup/basics/marryplan',
        name: 'MarryPlanPage',
        component: MarryPlanPage,
    },
    {
        path: '/signup/start-with-phone',
        name: 'StartWithPhonePage',
        component: StartWithPhonePage,
    },
    {
        path: '/signup/temp/height',
        name: 'OnboardHeight',
        component: Height,
    },
    {
        path: '/signup/temp/marriage',
        name: 'OnboardMarriage',
        component: Marriage,
    },
    {
        path: '/signup/temp/have-child',
        name: 'OnboardHaveChild',
        component: HaveChild,
    },
    {
        path: '/signup/temp/marry-plan',
        name: 'OnboardMarryPlan',
        component: MarryPlan,
    },
    {
        path: '/signup/temp/use-manager',
        name: 'OnboardUseManager',
        component: UseManager,
    },
    {
        path: '/signup/temp/state',
        name: 'OnboardState',
        component: State,
    },
    {
        path: '/signup/temp/station',
        name: 'OnboardStation',
        component: Station,
    },
    {
        path: '/signup/temp/region',
        name: 'OnboardRegion',
        component: Region,
    },
    {
        path: '/signup/temp/job-category',
        name: 'OnboardJobCategory',
        component: JobCategory,
    },
    {
        path: '/signup/temp/school',
        name: 'OnboardSchool',
        component: School,
    },
    {
        path: '/signup/temp/appeal-point',
        name: 'OnboardWhyDifficult',
        component: WhyDifficult,
    },
]
