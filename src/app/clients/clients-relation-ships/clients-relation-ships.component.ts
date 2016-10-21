import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Client }                 from 'ng2-f-client-models';
import { SelectedClientsService } from '../selected-clients/selected-clients.service';
import { ClientsRelationShipsService } from './clients-relation-ships.service';

@Component({
  selector: 'ng2-f-clients-relation-ships',
  template: require('./clients-relation-ships.component.html')
})
export class ClientsRelationShipsComponent implements OnInit {
  clients: Promise<Client[]>;
  listLabel: string = 'Osoby ve vzhtahu:';
  selectLabel: string = 'Vybrat';

  constructor(
    private selectedClientService: SelectedClientsService,
    private clientsRelationShipsService: ClientsRelationShipsService) { }

  ngOnInit() {
    // TODO: change to real logic to get client id
    this.clients = this.clientsRelationShipsService.getRelatedClients(1);
  }

  clientSelected(client: Client) {
    this.selectedClientService.addClient(client);
  }

}
