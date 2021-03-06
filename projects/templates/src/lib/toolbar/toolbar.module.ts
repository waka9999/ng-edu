import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [ToolbarComponent, LanguageMenuComponent],
  imports: [MatMenuModule],
  exports: [ToolbarComponent, LanguageMenuComponent],
})
export class ToolbarModule {}
