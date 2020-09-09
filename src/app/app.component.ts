import { Component } from '@angular/core';
declare var FB;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment-hacker-news';

  shareOverrideOGMeta() {
    const overrideTitle = `${Math.random() * 10} Title`;
    const overrideDescription = `${Math.random() * 10} Desc`;
    const overrideLink = 'http://assignment-hacker-news.herokuapp.com/';
    const overrideImage = 'https://eventbox-prod.s3.amazonaws.com/profile/80245241589900869247.jpg';
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: {
          'og:url': overrideLink,
          'og:title': overrideTitle,
          'og:description': overrideDescription,
          'og:image': overrideImage
        }
      })
    },
      function (response) {
        // Action after response
      });
  }
}
