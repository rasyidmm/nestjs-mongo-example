import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  @ApiOkResponse({ type: CreateContactDTO })
  @Get('contacts')
  async getContacts(@Res() res) {
    const contacts = await this.contactService.getContacts();
    return res.status(HttpStatus.OK).json(contacts);
  }

  @Get('contacts/:contactId')
  async getContact(
    @Res() res,
    @Param('contactId', new ValidateObjectId()) contactId,
  ) {
    const contact = await this.contactService.getContact(contactId);
    if (!contactId) {
      throw new NotFoundException('Contact does not exist');
    }
    return res.status(HttpStatus.OK).json(contact);
  }

  @Post('/new')
  async addContact(@Res() res, @Body() createdContactDTO: CreateContactDTO) {
    const newContact = await this.contactService.addContact(createdContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been created successfully',
      contact: newContact,
    });
  }

  @Put('/edit')
  async editContact(
    @Res() res,
    @Query('contactId', new ValidateObjectId()) contactId,
    @Body() createContactDTO: CreateContactDTO,
  ) {
    const editContact = await this.contactService.editContact(
      contactId,
      createContactDTO,
    );

    if (!editContact) {
      throw new NotFoundException('Contact does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Contact has been successfully updated',
      contact: editContact,
    });
  }

  @Delete('/delete')
  async deletedContact(
    @Res() res,
    @Query('contactId', new ValidateObjectId()) contactId,
  ) {
    const deletedContact = await this.contactService.deleteContact(contactId);
    if (!deletedContact) {
      throw new NotFoundException('Contact does not exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been successfully deleted',
      contact: deletedContact,
    });
  }
}
