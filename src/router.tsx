import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { lazy, Suspense} from 'react' //Aplico lazy loading para mejorar el rendimiento
import AppLayout from '@/layouts/AppLayout';
import DashboardView from '@/views/DashboardView';
import AuthLayout from './layouts/AuthLayout';
import ProfileLayout from './layouts/ProfileLayout';
const CreateProjectView = lazy(() => import('./views/projects/CreateProjectView'))
const ProjectDetailsView = lazy(() => import ( './views/projects/ProjectDetailsView'))
const EditProjectView = lazy(() => import('./views/projects/EditProjectView'))
const LoginView = lazy(() => import('./views/auth/LoginView'))
const RegisterView = lazy(() => import('./views/auth/RegisterView'))
const ConfirmAccountView = lazy(() => import('./views/auth/ConfirmAccountView'))
const RequestNewCodeView = lazy(() => import('./views/auth/RequestNewCodeView'))
const ForgotPasswordView = lazy(() => import('./views/auth/ForgotPasswordView'))
const NewPasswordView = lazy(() => import('./views/auth/NewPasswordView'))
const ProjectTeamView = lazy(() => import('./views/projects/ProjectTeamView'))
const ProfileView = lazy(() => import('./views/profile/ProfileView'))
const ChangePasswordView = lazy(() => import('./views/profile/ChangePasswordView'))
const NotFoundView = lazy(()=> import('./views/404/NotFoundView'))


export default function Router () {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index/>
                    <Route path='/projects/create' element={<Suspense fallback="Cargando">{<CreateProjectView/>}</Suspense>}/>
                    <Route path='/projects/:projectId' element={<Suspense fallback="Cargando">{<ProjectDetailsView/>}</Suspense>}/>
                    <Route path='/projects/:projectId/edit' element={<Suspense fallback="Cargando">{<EditProjectView/>}</Suspense>}/>
                    <Route path='/projects/:projectId/team' element={<Suspense fallback="Cargando">{<ProjectTeamView/>}</Suspense>}/>
                    <Route element={<ProfileLayout /> /** layout anidado */}> 
                        <Route path='/profile' element={<Suspense fallback="Cargando">{<ProfileView/>}</Suspense>}/>
                        <Route path='/profile/update-password' element={<Suspense fallback="Cargando">{<ChangePasswordView/>}</Suspense>}/>
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login'element={<Suspense fallback="Cargando">{<LoginView/>}</Suspense>}/>
                    <Route path='/auth/register' element={<Suspense fallback="Cargando">{<RegisterView/>}</Suspense>}/>
                    <Route path='/auth/confirm-account' element={<Suspense fallback="Cargando">{<ConfirmAccountView/>}</Suspense>} />
                    <Route path='/auth/request-code' element={<Suspense fallback="Cargando">{<RequestNewCodeView/>}</Suspense>} />
                    <Route path='/auth/forgot-password' element={<Suspense fallback="Cargando">{<ForgotPasswordView/>}</Suspense>} />
                    <Route path='/auth/new-password'  element={<Suspense fallback="Cargando">{<NewPasswordView/>}</Suspense>} />
                </Route>

                
                <Route element={<AuthLayout/>}>
                    {/** Al usar el * en el path envia a esa pagina cuando no hay coincidencias*/}
                    <Route path='*' element={<Suspense fallback="Cargando">{<NotFoundView/>}</Suspense>}  />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}