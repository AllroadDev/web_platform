import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	NotFoundException,
	ClassSerializerInterceptor,
	UseInterceptors,
	HttpCode,
	HttpStatus,
	UploadedFile,
	Post,
	Res,
	StreamableFile,
	ParseFilePipeBuilder,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
	AVATAR_NOT_FOUND_ERROR,
	USERS_NOT_FOUND_ERROR,
	USER_NOT_FOUND_ERROR,
} from './user.constants';
import { UserQueryDto } from './dto/user-query.dto';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { Action } from 'src/casl/types/casl-types.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUserId } from 'src/blocks/decorators/get-current-userId.decorator';
import { Response } from 'express';
import { createReadStream } from 'node:fs';
import { CheckPolicies } from 'src/blocks/decorators/check-policies.decorator';
import { PolicyHandler } from 'src/blocks/handlers/policy.handler';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConsumes,
	ApiForbiddenResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AvatarResponseDto } from './dto/avatar-response.dto';
import { AddSolvedProblemDto } from './dto/add-solved-problem.dto';
import { UserSolvedProblem } from './entities/user-solved-problem.entity';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@CheckPolicies(new PolicyHandler(Action.ReadMany, User))
	async findMany(@Query() query: UserQueryDto): Promise<AuthResponseDto[]> {
		const users = await this.userService.findMany(query);
		if (!users.length) throw new NotFoundException(USERS_NOT_FOUND_ERROR);
		return users.map((user: User) => new AuthResponseDto(user));
	}

	@Patch(':id')
	@CheckPolicies(new PolicyHandler(Action.Update, User))
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<AuthResponseDto> {
		console.log(dto);
		const user = await this.userService.updateOne({ id }, dto);
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return new AuthResponseDto(user);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string): Promise<void> {
		const user = await this.userService.remove({ id });
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
	}

	@Post('avatar')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file'))
	@CheckPolicies(new PolicyHandler(Action.Upload, User))
	async uploadAvatar(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addMaxSizeValidator({ maxSize: Math.pow(1024, 2) * 5 }) // 5mb
				.addFileTypeValidator({ fileType: /png|jpeg|jpg|webp/ })
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				}),
		)
		file: Express.Multer.File,
		@GetCurrentUserId() id: string,
	): Promise<AvatarResponseDto> {
		const avatar = await this.userService.uploadAvatar(file, id);
		return new AvatarResponseDto(avatar);
	}

	@Get('avatar')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, User))
	async getUserAvatar(
		@GetCurrentUserId() id: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<StreamableFile> {
		const avatar = await this.userService.getUserAvatar(id);
		if (!avatar) throw new NotFoundException(AVATAR_NOT_FOUND_ERROR);
		const stream = createReadStream(avatar.path);
		res.set({
			'Content-Type': avatar.mimetype,
		});
		return new StreamableFile(stream);
	}

	@Delete('delete/avatar')
	@HttpCode(HttpStatus.NO_CONTENT)
	@CheckPolicies(new PolicyHandler(Action.Delete, User))
	async removeAvatar(@GetCurrentUserId() id: string): Promise<void> {
		await this.userService.removeAvatar(id);
	}

	// For testing purposes
	@Post('add-solved-problem')
	@HttpCode(HttpStatus.NO_CONTENT)
	async addSolvedProblems(
		@GetCurrentUserId() userId: string,
		@Body() dto: AddSolvedProblemDto,
	): Promise<void> {
		dto.user_id = userId;
		await this.userService.addSolvedProblem({ ...dto });
	}

	@Get('solved-problems')
	// @CheckPolicies(new PolicyHandler(Action.ReadMany, User))
	async getSolvedProblems(@GetCurrentUserId() id: string): Promise<UserSolvedProblem[]> {
		return this.userService.getSolvedProblems(id);
	}

	@Get(':id')
	@CheckPolicies(new PolicyHandler(Action.ReadOne, User))
	async findOne(@Param('id') id: string): Promise<AuthResponseDto> {
		const user = await this.userService.findOne({ id });
		if (!user) throw new NotFoundException(USER_NOT_FOUND_ERROR);
		return new AuthResponseDto(user);
	}
}
