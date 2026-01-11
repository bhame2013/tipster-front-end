"use server"
import {HttpRequest} from "../utils/http/interfaces"
import {request} from "../utils/http/axios-http-client"

export async function requestServer(params: HttpRequest) {
  return await request(params)
}
