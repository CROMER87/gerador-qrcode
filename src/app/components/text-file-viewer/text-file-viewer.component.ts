import { Component, OnInit } from '@angular/core';
import { Service } from '../service/services';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-text-file-viewer',
  templateUrl: './text-file-viewer.component.html',
  styleUrls: ['./text-file-viewer.component.css'],
})
export class TextFileViewerComponent implements OnInit {
  fileContent: string = '';

  constructor(private service: Service) {}

  ngOnInit(): void {
    const filePath = 'assets/ads.txt';
    this.service.getTextFile(filePath).subscribe({
      next: (data) => {
        this.fileContent = data;
      },
      error: (err) => {
        console.error('Error fetching file:', err);
      },
    });
  }
}
