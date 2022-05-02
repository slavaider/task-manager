import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
