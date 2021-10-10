import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {ContactDetails} from "./contact-details.model";
import {Observable, Subject} from "rxjs";
import {tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  constructor(private http: HttpClient) {
  }

  contactdetails: ContactDetails [] = [];
  updateContacts = new Subject<number>();
  updatedContacts = new Subject<ContactDetails []>();
  isEdit = new Subject<boolean>();
  isSelectContactId = new Subject<number>();

  loadContacts(): Observable<ContactDetails[]> {
    return this.http
      .get<ContactDetails[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map(contactdetails => {
          return contactdetails.map(contactdetails => {
            return {
              ...contactdetails
            };
          });
        }),
        tap((contactdetails) => {
          this.contactdetails = contactdetails;
          this.updatedContacts.next(this.contactdetails.slice())
          console.log(contactdetails);
        }))
  }

  onGetContactById(contactdetails: ContactDetails): Observable<ContactDetails> {
    return this.http.get<ContactDetails>(`https://jsonplaceholder.typicode.com/users/${contactdetails.id}`);
  }

  onUpdate(contactdetails: ContactDetails): Observable<ContactDetails> {
    return this.http.put<ContactDetails>(`https://jsonplaceholder.typicode.com/users/${contactdetails.id}`, contactdetails);
  }

  getContact(id: number) {
    return this.contactdetails[id - 1];
  }

  oncontactUpdate(contactdetails: ContactDetails): Observable<ContactDetails> {
    return this.http.put<ContactDetails>(`https://jsonplaceholder.typicode.com/users/${contactdetails.id}`, contactdetails);
  }

  getContactDetails() {
    return this.contactdetails.slice();
  }

  addContactDetails(contactdetails: ContactDetails) {
    this.contactdetails.push(contactdetails);
    this.updatedContacts.next(this.contactdetails.slice());
  }

  onDelete(id: number) {
    this.contactdetails.splice(id, 1);
    this.updatedContacts.next(this.contactdetails.slice());
  }

  storeContact(newContactDetails: ContactDetails) {
    return this.http.post<ContactDetails>('https://jsonplaceholder.typicode.com/users', newContactDetails)
      .subscribe(response => {
          this.addContactDetails(response);
        }
      )
  }


  updateExistingContact(id: number, contactDetails: ContactDetails) {

    return this.http.put(
      'https://jsonplaceholder.typicode.com/users/'+id,
      contactDetails
    ).subscribe(

      response => { this.updateForm(id-1,contactDetails); }
    )
  }


  updateForm(index: number, contactdetails: ContactDetails) {

    this.contactdetails[index] = contactdetails;


    this.updatedContacts.next(this.contactdetails.slice());
  }
}
