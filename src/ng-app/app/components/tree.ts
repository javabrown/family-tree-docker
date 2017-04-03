import {Component, Directive} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';


@Component({
	selector: 'tree',
	template: '<h1>Hello {{a}}</h1>'
})

export class Tree {
    a : "Hello Tree";
};