import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndossoComponent } from '../endosso.component';
import { EndossoFormComponent } from '../endosso-form/endosso-form.component';

const endossoRoutes = [
    {path: '', component: EndossoComponent},
    {path: 'novo', component: EndossoComponent},
    {path: 'cadastrar', component: EndossoFormComponent}
];

@NgModule({
    imports: [RouterModule.forChild(endossoRoutes)],
    exports: [RouterModule]
})
export class EndossoRoutingModule {
}
