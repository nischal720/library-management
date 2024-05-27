import { ApiProperty } from '@nestjs/swagger';
import { PageSearch } from '@sksharma72000/nestjs-search-page';

export class StudentSearchDto {
  @ApiProperty()
  @PageSearch()
  first_name: string;

  @ApiProperty()
  @PageSearch()
  last_name: string;

  @ApiProperty()
  @PageSearch()
  email: string;

  @ApiProperty()
  @PageSearch({ operator: 'and', operation: 'eq' })
  id: number;

  @ApiProperty()
  @PageSearch()
  dob_np: string;
}
