import { useMutation } from "@tanstack/react-query";
import { postChat, fetchUrlAsArrayBuffer } from "../service/api";

export function useSendMessage(options = {}) {
  return useMutation({
    mutationFn: (payload) => postChat(payload),
    ...options,
  });
}

export function useFetchUrlArrayBuffer() {
  return useMutation({
    mutationFn: (url) => fetchUrlAsArrayBuffer(url),
  });
}
