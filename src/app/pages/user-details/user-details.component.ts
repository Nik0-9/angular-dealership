import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  userName: string | undefined = '';
  userRole: string | undefined = '';
  profileImage: string = '';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
      this.getUserDetails();
      this.getProfileImage();
  }

  getUserDetails(){
    const user = this.authService.getUserDetails();
    if (user) {
      this.userName = user.name;
      this.userRole = user.role;
    }
  }

  getProfileImage(){
    this.http.get('/api',
    {responseType: 'blob'})
    .subscribe((res) =>{
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.profileImage = event.target.result;
      };
      reader.readAsDataURL(res);
    });
  }
}
