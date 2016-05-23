/// <reference path="../../typings/tsd.d.ts" />
//import Dictionary = collections.Dictionary;

import {Device} from 'ionic-native';
import {Injectable} from '@angular/core';
import {User, Stream} from '../contracts/ServerContracts';
import {ServiceCaller} from './servicecaller';

import {Observable} from 'rxjs/Observable';


@Injectable()
export class Config {    
    version = "0.0.1";
    
    //#region global variables
    language: string = 'Hindi';
    user: User = null;
    
    state: string = 'Active';
    globalTimer: number = 0;
    isOnAndroid: boolean = false;
    
   // labels: Dictionary<string, string> = new Dictionary<string, string>();
    //#endregion global variables
        
    constructor(public service: ServiceCaller) {
    }   

    setUser(): Observable<User> {
        let parentThis = this;
        let user: User = window.localStorage.getItem('user');
        if (user == undefined || user == null) {
            let userId: string = 'testId';
            if (this.isOnAndroid) {
                console.log('fetching device....');
                var device = Device.device;
                userId = device.uuid; 
            }            
            let userOb = this.service.getUser(userId, this.language);
            userOb.subscribe(data => {
                parentThis.user = data;
            });
            return userOb;
        }
        else {
            parentThis.user = user;
            return Observable.of(user);
        }
    }
    
    setStateToActive() {
        this.state = 'Active';
    }
    
    setStateToBackground() {
        this.state = 'Background';        
    }
    
    isActive() : boolean { return this.state == 'Active';}
    
    initTimer() {
        this.globalTimer = new Date().getTime();
        console.log("timer started");
    }

    getTimeElapsed() : number {
        return new Date().getTime() - this.globalTimer;
    }
    
    printTimeElapsed() {
        console.log("Time: " + (new Date().getTime() - this.globalTimer) + "ms");
    }
    /*
    setLabels(labels: Dictionary<string, string>) {
        this.labels = labels;
    }
        
    setInitialLabels() {
        this.labels = new Dictionary<string, string>();
    }
    */
    getLabel(label: string) {
        try {
            return label;
        }
        catch(error) {
            return label;
        }
    }
    
}