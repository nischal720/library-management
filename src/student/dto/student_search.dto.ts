import { ApiProperty } from '@nestjs/swagger';
import { PageSearch } from '@sksharma72000/nestjs-search-page';

export class StudentSearchDto {
  @ApiProperty({ required: false })
  @PageSearch()
  first_name: string;

  @ApiProperty({ required: false })
  @PageSearch()
  last_name: string;

  @ApiProperty({ required: false })
  @PageSearch()
  email: string;

  @ApiProperty({ required: false })
  @PageSearch({ operator: 'and', operation: 'eq' })
  id: number;

  @ApiProperty({ required: false })
  @PageSearch()
  dob_np: string;
}
