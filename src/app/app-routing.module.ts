import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ComponentLayoutComponent } from './layout/component-layout/component-layout.component';
const routes: Routes = [
  {
    path: '', component: ComponentLayoutComponent, children:
      [
        { path: 'cart', loadChildren: () => import('./view/component/cart/cart.module').then(m => m.CartModule) },
        { path: 'admin', loadChildren: () => import('./view/component/goods/goods.module').then(m => m.GoodsModule) },
        { path: '', loadChildren: () => import('./view/component/home/home.module').then(m => m.HomeModule) },
        { path: 'login', loadChildren: () => import('./view/component/login/login.module').then(m => m.LoginModule) },
        { path: 'signup', loadChildren: () => import('./view/component/signup/signup.module').then(m => m.SignupModule) },
        { path: '**' ,loadChildren: () => import('./view/component/not-found/not-found.module').then(m => m.NotFoundModule)},
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
