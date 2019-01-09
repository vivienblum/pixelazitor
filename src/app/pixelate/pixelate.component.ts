import { Component, OnInit, Output, EventEmitter } from "@angular/core"
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
  amount: number
  private _image: HTMLImageElement = null

  @Output() next: EventEmitter<HTMLImageElement> = new EventEmitter()

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image
  }

  constructor(private fb: FormBuilder) {
    this.amountForm = this.fb.group({
      amount: 0.1
    })
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  get image() {
    return this._image
  }

  onUpdate() {
    this.amount = this.amountForm.value.amount
    // TODO send image with this.next.emit(this._image)
  }

  onImageChange(image) {
    this.next.emit(image)
  }

  hasImage(): boolean {
    return this._image !== null
  }
}
