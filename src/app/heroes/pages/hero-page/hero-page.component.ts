import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {Hero} from "../../interfaces/hero.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, switchMap} from "rxjs";

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;
  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
        this.activatedRoute.params
          .pipe(
            // delay(300),
            switchMap( ({ id }) => this.heroService.getHeroById( id )),
          ).subscribe((hero) => {
            if ( !hero ) return this.router.navigate(['/heroes.list']);

            this.hero = hero;
            return;
        })
    }

    goBack():void {
    this.router.navigateByUrl('/heroes/list');
    }


}
