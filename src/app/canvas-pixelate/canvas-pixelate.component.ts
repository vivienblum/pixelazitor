import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'app-canvas-pixelate',
    templateUrl: './canvas-pixelate.component.html',
    styleUrls: ['./canvas-pixelate.component.scss'],
})
export class CanvasPixelateComponent implements OnInit {
    @ViewChild('canvas', { static: true }) public canvas: ElementRef;
    private _amount: number;
    private _image: HTMLImageElement;
    private _width: number = 400;
    private _height: number = 400;

    @Input()
    set amount(amount: number) {
        if (amount && this._amount !== amount) {
            this._amount = amount;
            if (this.cx) {
                this.pixelateImage(this._image, this._amount);
                const imagePixelate =
                    this.canvas.nativeElement.toDataURL('image/png');
                this.handleImageChange.emit(imagePixelate);
            }
        }
    }

    @Input()
    set image(image: HTMLImageElement) {
        this._image = image;
        this._width = this._height = 0.8 * window.innerWidth;

        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;

        this.cx = canvasEl.getContext('2d');

        if (this._image) {
            this._image.onload = function () {
                const agrandissement = this.getAgrandissement(this._image);
                if (
                    this._image.width <= this._width &&
                    this._image.height <= this._height
                ) {
                    canvasEl.width = this._image.width;
                    canvasEl.height = this._image.height;
                } else if (this._image.height <= this._height) {
                    canvasEl.width = this._width;
                    canvasEl.height = this._image.height;
                } else if (this._image.width <= this._width) {
                    canvasEl.width = this._image.width;
                    canvasEl.height = this._height;
                } else {
                    if (this._image.width > this._image.height) {
                        canvasEl.width = this._width;
                        canvasEl.height = this._image.height * agrandissement;
                    } else {
                        canvasEl.width = this._image.width * agrandissement;
                        canvasEl.height = this._height;
                    }
                }

                this.cx.drawImage(
                    this._image,
                    0,
                    0,
                    this._image.width * agrandissement,
                    this._image.height * agrandissement
                );
            }.bind(this);
        }
    }

    @Output()
    handleImageChange: EventEmitter<HTMLImageElement> = new EventEmitter();

    private cx: CanvasRenderingContext2D;
    constructor() {}

    ngOnInit() {}

    disableSmoothRendering(cx) {
        cx.webkitImageSmoothingEnabled = false;
        cx.mozImageSmoothingEnabled = false;
        cx.msImageSmoothingEnabled = false;
        cx.imageSmoothingEnabled = false;
        return cx;
    }

    pixelateImage(image, amount) {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        const agrandissement = this.getAgrandissement(image);

        this.cx = this.disableSmoothRendering(this.cx);
        // const amount = 0.2
        var w = canvasEl.width * (amount <= 0 ? 0.01 : amount);
        var h = canvasEl.height * (amount <= 0 ? 0.01 : amount);

        // render smaller image
        this.cx.drawImage(image, 0, 0, w, h);
        // stretch the smaller image
        this.cx.drawImage(
            canvasEl,
            0,
            0,
            w,
            h,
            0,
            0,
            image.width * agrandissement,
            image.height * agrandissement
        );
    }

    getAgrandissement(image: HTMLImageElement): number {
        if (image.width <= this._width && image.height <= this._height) {
            return 1;
        } else if (image.height <= this._height) {
            return this._width / image.width;
        } else if (image.width <= this._width) {
            return this._height / image.height;
        } else {
            if (image.width > image.height) {
                return this._width / image.width;
            } else {
                return this._height / image.height;
            }
        }
    }

    get amount(): number {
        return this._amount;
    }

    get image(): HTMLImageElement {
        return this._image;
    }
}
