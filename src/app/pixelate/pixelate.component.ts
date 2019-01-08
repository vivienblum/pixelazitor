import { Component, OnInit } from "@angular/core"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { MatSliderModule } from "@angular/material/slider"
import { Input, ElementRef, AfterViewInit, ViewChild } from "@angular/core"
import { fromEvent } from "rxjs"
import { switchMap, takeUntil, pairwise } from "rxjs/operators"

@Component({
  selector: "app-pixelate",
  templateUrl: "./pixelate.component.html",
  styleUrls: ["./pixelate.component.scss"]
})
export class PixelateComponent implements OnInit {
  amountForm: FormGroup
  amount: number = 1

  constructor(private fb: FormBuilder) {
    this.amountForm = this.fb.group({
      amount: ["", Validators.required]
    })
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  onUpdate() {
    this.amount = this.amountForm.value.amount
  }
}
