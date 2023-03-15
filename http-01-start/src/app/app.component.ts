import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false
  error = null
  private errorSub: Subscription

  constructor(
    private http: HttpClient,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })

    this.isFetching = true

    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      console.log(error.message)
      this.isFetching = false
      this.error = error.message
    })
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);

    // this.postsService.createAndStorePost1(postData.title, postData.content)
    //   .subscribe((responseData) => {
    //     console.log(responseData)
    //     this.loadedPosts.push(postData)
    //   })

    this.postsService.createAndStorePost2(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true

    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      console.log(error.message)
      this.isFetching = false
      this.error = error.message
    })
  }

  onClearPosts() {
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = []
      })
  }

  onHandleError() {
    this.error = null
  }
  
  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }
}
