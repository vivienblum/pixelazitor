import { Component, OnInit } from "@angular/core"
import { MatStepperModule } from "@angular/material/stepper"

@Component({
  selector: "app-stepper",
  templateUrl: "./stepper.component.html",
  styleUrls: ["./stepper.component.scss"]
})
export class StepperComponent implements OnInit {
  nextButton1: boolean = false
  nextButton2: boolean = false
  nextButton3: boolean = false
  imageToPixelate: HTMLImageElement = null
  imagePixelate: HTMLImageElement = null

  constructor() {}

  ngOnInit() {}

  next(image: HTMLImageElement, step: number) {
    switch (step) {
      case 1:
        this.nextButton1 = true
        this.imageToPixelate = image
        break
      case 2:
        this.nextButton2 = true
        this.imagePixelate = image
        // TODO send to server to match
        break
      case 3:
        this.nextButton3 = true
        break
      default:
        break
    }
  }
}
