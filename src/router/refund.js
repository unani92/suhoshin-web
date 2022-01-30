import Refund1Page from '@/routes/refund/Refund1Page'
import Refund2Page from '@/routes/refund/Refund2Page'
import Refund3DatingPage from '@/routes/refund/Refund3DatingPage'
import Refund4ReasonPage from '@/routes/refund/Refund4ReasonPage'
import Refund5ExcludePage from '@/routes/refund/Refund5ExcludePage'
import Refund6DescriptionPage from '@/routes/refund/Refund6DescriptionPage'
import Refund7PhotosPage from '@/routes/refund/Refund7PhotosPage'
import Refund8ConfirmPage from '@/routes/refund/Refund8ConfirmPage'
import Refund9RefundedPage from '@/routes/refund/Refund9RefundedPage'
import RefundPolicyPage from '@/routes/refund/RefundPolicyPage'
import RefundPolicyDetailsPage from '@/routes/refund/RefundPolicyDetailsPage'

export default [
    {
        path: '/refund-policy',
        name: 'RefundPolicyPage',
        component: RefundPolicyPage,
    },
    {
        path: '/refund-policy-details',
        name: 'RefundPolicyDetailsPage',
        component: RefundPolicyDetailsPage,
    },
    {
        path: '/refund/1',
        name: 'Refund1Page',
        component: Refund1Page,
    },
    {
        path: '/refund/2',
        name: 'Refund2Page',
        component: Refund2Page,
    },
    {
        path: '/refund/3',
        name: 'Refund3DatingPage',
        component: Refund3DatingPage,
    },
    {
        path: '/refund/4',
        name: 'Refund4ReasonPage',
        component: Refund4ReasonPage,
    },
    {
        path: '/refund/5',
        name: 'Refund5ExcludePage',
        component: Refund5ExcludePage,
    },
    {
        path: '/refund/6',
        name: 'Refund6DescriptionPage',
        component: Refund6DescriptionPage,
    },
    {
        path: '/refund/7',
        name: 'Refund7PhotosPage',
        component: Refund7PhotosPage,
    },
    {
        path: '/refund/8',
        name: 'Refund8ConfirmPage',
        component: Refund8ConfirmPage,
    },
    {
        path: '/refund/9',
        name: 'Refund9RefundedPage',
        component: Refund9RefundedPage,
    },
]
