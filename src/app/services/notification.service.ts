import { Injectable } from "@angular/core";
import { MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    constructor(private snackbar: MatSnackBar){}

show(message: string){
    this.snackbar.open(message,'close',{
        duration:4000
    });
}









}