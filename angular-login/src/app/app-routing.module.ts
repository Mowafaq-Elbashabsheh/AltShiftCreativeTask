import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DatapageComponent } from "./datapage/datapage.component";
import { HomeComponent } from "./home/home.component";
import { MapComponent } from "./map/map.component";
import { NavComponent } from "./nav/nav.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'map', component: MapComponent},
    {path: 'datapage', component: DatapageComponent},
    {path: 'nav', component: NavComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }