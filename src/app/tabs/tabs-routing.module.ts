import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../home/home.module").then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: "insert",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../insert/insert.module").then(m => m.InsertPageModule)
          }
        ]
      },
      {
        path: "insert-activity",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../insert-activity/insert-activity.module").then(m => m.InsertActivityPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
