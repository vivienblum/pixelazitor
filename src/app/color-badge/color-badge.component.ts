import { Component, OnInit, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
    selector: 'app-color-badge',
    templateUrl: './color-badge.component.html',
    styleUrls: ['./color-badge.component.scss'],
})
export class ColorBadgeComponent implements OnInit {
    private _red: number;
    private _green: number;
    private _blue: number;

    @Input()
    set red(red: number) {
        this._red = red;
    }

    @Input()
    set green(green: number) {
        this._green = green;
    }

    @Input()
    set blue(blue: number) {
        this._blue = blue;
    }

    constructor() {}

    ngOnInit() {}

    calculateStyles() {
        return {
            background:
                'rgb(' +
                this._red +
                ', ' +
                this._green +
                ', ' +
                this._blue +
                ')',
        };
    }

    get red(): number {
        return this._red;
    }

    get green(): number {
        return this._green;
    }

    get blue(): number {
        return this._blue;
    }
}
