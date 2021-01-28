import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { LinksWidgetComponent } from './links-widget/links-widget.component';
import { ImageWidgetComponent } from './image-widget/image-widget.component';
import { RouterModule } from '@angular/router';
import { CopyrightComponent } from './copyright/copyright.component';

@NgModule({
  declarations: [FooterComponent, LinksWidgetComponent, ImageWidgetComponent, CopyrightComponent],
  imports: [CommonModule, RouterModule],
  exports: [FooterComponent],
})
export class FooterModule {}
