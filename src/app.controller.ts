import { Controller, Get, Header, HttpCode, Post, Redirect, Query, Param } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return `welcome to my movie api`;
  }

  @HttpCode(204)
  @Header("Cookie", '{ "something": "something" }')
  @Post("/session")
  postHome() {
    return `welcome to home`;
  }

  @Get('docs')
  @Redirect('https//docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version !== 5) {
      return (
        {
          url: "https://naver.com",
          statusCode: 303
        }
      )
    }
  }

  @Get(':id/:id2')
  findOne(@Param() params) {
    return {
      id: params.id,
      id2: params.id2,
    }
  }
}
