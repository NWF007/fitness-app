import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "src/app/shared/ui.service";
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../../app.reducer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(map((state) => state.ui.isLoading));
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (isLoading) => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl("", { validators: [Validators.required] }),
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  // ngOnDestroy() {
  //   if (this.isLoading) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
