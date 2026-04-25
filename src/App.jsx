import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import AdminHomePage from './Pages/Admin/AdminHomePage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminFeatureCreatePage from './Pages/Admin/Feature/AdminFeatureCreatePage'
import AdminFeatureUpdatePage from './Pages/Admin/Feature/AdminFeatureUpatePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminFaqCreatePage from './Pages/Admin/Faq/AdminFaqCreatePage'
import AdminFaqUpdatePage from './Pages/Admin/Faq/AdminFaqUpatePage'

import AdminPricingPage from './Pages/Admin/Pricing/AdminPricingPage'
import AdminPricingCreatePage from './Pages/Admin/Pricing/AdminPricingCreatePage'
import AdminPricingUpdatePage from './Pages/Admin/Pricing/AdminPricingUpatePage'
import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'
import AboutPage from './Pages/AboutPage'
import FeaturePage from './Pages/FeaturePage'
import PricingPage from './Pages/PricingPage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage'
import TermsAndConditionPage from './Pages/TermsAndConditionPage'
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import ProfilePage from './Pages/User/ProfilePage'
import Payment from './Pages/User/Payment'
import OrderConfirmation from './Pages/User/OrderConfirmation'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/feature' element={<FeaturePage />} />
        <Route path='/pricing' element={<PricingPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='contactus' element={<ContactUsPage />} />
        <Route path='privacy' element={<PrivacyPolicyPage />} />
        <Route path='tc' element={<TermsAndConditionPage />} />

        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* User Routes */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/payment/:_id' element={<Payment />} />
        <Route path='/order-confirmation' element={<OrderConfirmation />} />


        {/* Admin Routes */}
        <Route path='/admin' element={<AdminHomePage />} />

        <Route path='/admin/feature' element={<AdminFeaturePage />} />
        <Route path='/admin/feature/create' element={<AdminFeatureCreatePage />} />
        <Route path='/admin/feature/update/:_id' element={<AdminFeatureUpdatePage />} />

        <Route path='/admin/faq' element={<AdminFaqPage />} />
        <Route path='/admin/faq/create' element={<AdminFaqCreatePage />} />
        <Route path='/admin/faq/update/:_id' element={<AdminFaqUpdatePage />} />

        <Route path='/admin/pricing' element={<AdminPricingPage />} />
        <Route path='/admin/pricing/create' element={<AdminPricingCreatePage />} />
        <Route path='/admin/pricing/update/:_id' element={<AdminPricingUpdatePage />} />

        <Route path='/admin/setting' element={<AdminSettingPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
