import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];
  habilitado = true;
  constructor(private _postsService: PostsService) {


  }
  ngOnInit() {
    this.siguientes();
    this._postsService.nuevoPost.subscribe(post => {
      this.posts.unshift(post)
    });
    
  }
  recargar(event) {
    this.siguientes(event, true)
    this.habilitado = true;
    this.posts = []
  }

  siguientes(event?, pull: boolean = false) {

    this._postsService.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.posts)
      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.habilitado = false;
        }

      }
    })
  }
}
