import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-feed-cards',
  templateUrl: './feed-cards.component.html',
  styleUrls: ['./feed-cards.component.css'],
  providers: [HttpClient, HttpClientModule]
})
export class FeedCardsComponent implements OnInit {

  podcastEpisodes: any[];
  jsonPodcastDocument: any;
  constructor(private http: HttpClient) { }

  async ngOnInit() {

    return this.http.get('https://s3-us-west-2.amazonaws.com/motionpixelspodcast.com/podcast.xml', {responseType: 'text'})
      .subscribe(data => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data,"text/xml");
        this.jsonPodcastDocument = this.xml2json(xmlDoc);
        var podcastEpisodes = this.jsonPodcastDocument.rss.channel.item;
        if(Array.isArray(podcastEpisodes)){
          this.podcastEpisodes = podcastEpisodes;
        }
        else{
          this.podcastEpisodes = [podcastEpisodes];
        }
        console.log(this.podcastEpisodes[0]);
    });
  }

  xml2json(xml: any): any {
    try {
      var obj = {};
      if (xml.children.length > 0) {
        for (var i = 0; i < xml.children.length; i++) {
          var item = xml.children.item(i);
          var nodeName = item.nodeName;
  
          if (typeof (obj[nodeName]) == "undefined") {
            obj[nodeName] = this.xml2json(item);
          } else {
            if (typeof (obj[nodeName].push) == "undefined") {
              var old = obj[nodeName];
  
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xml2json(item));
          }
        }
      } else {
        obj = xml.textContent;
      }
      return obj;
    } catch (e) {
        console.log(e.message);
    }
  }
}
