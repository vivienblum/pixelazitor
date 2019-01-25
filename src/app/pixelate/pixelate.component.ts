import { Component, OnInit, Output, EventEmitter } from "@angular/core"
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms"
import { MatSliderModule } from "@angular/material/slider"
import { Input, ElementRef, AfterViewInit, ViewChild } from "@angular/core"
import { fromEvent } from "rxjs"
import { switchMap, takeUntil, pairwise } from "rxjs/operators"
import { environment } from "../../environments/environment"

@Component({
  selector: "app-pixelate",
  templateUrl: "./pixelate.component.html",
  styleUrls: ["./pixelate.component.scss"]
})
export class PixelateComponent implements OnInit {
  amountForm: FormGroup
  private _amount: number
  pixelMin: number = environment.pixelMin
  private _image: HTMLImageElement = null

  @Output() next: EventEmitter<HTMLImageElement> = new EventEmitter()

  @Input()
  set image(image: HTMLImageElement) {
    this._image = image
  }

  constructor(private fb: FormBuilder) {
    this.amountForm = this.fb.group({
      amount: -0.2
    })
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  get image() {
    return this._image
  }

  onUpdate() {
    this._amount = -this.amountForm.value.amount
  }

  onImageChange(image) {
    const imageToSend = new Image()
    imageToSend.src = image
    this.next.emit(imageToSend)
  }

  hasImage(): boolean {
    return this._image !== null
  }

  get amount(): number {
    return this._amount
  }
}
