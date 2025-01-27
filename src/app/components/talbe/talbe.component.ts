import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talbe',
  templateUrl: './talbe.component.html',
  styleUrls: ['./talbe.component.scss']
})
export class TalbeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  items = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' }
  ];

  hoveredColumn: { row: number; column: string } | null = null;

  onEdit(item: any): void {
    console.log('Edit clicked', item);
    // Handle edit action
  }

  onDelete(item: any): void {
    console.log('Delete clicked', item);
    // Handle delete action
  }

  onView(item: any): void {
    console.log('View clicked', item);
    // Handle view action
  }

  onDetails(item: any): void {
    console.log('Details clicked', item);
    // Handle details action
  }
}
