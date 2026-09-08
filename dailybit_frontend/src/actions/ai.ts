import { aiDomain } from "@/helper/backendAIDomain";
import { AIQuery, Conversation } from "@/helper/types";

export async function getConversations(
  userId: number,
  courseId: number,
  chapterId: number
): Promise<Conversation[]> {
  const url = `${aiDomain}/conversations?user_id=${userId}&course_id=${courseId}&chapter_id=${chapterId}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: headers,
  });
  if (response.status >= 300 || response.status < 200) {
    throw 'server error';
  }
  const data = await response.json();
  return data as Conversation[];
}

export async function askAI(payload: AIQuery): Promise<Conversation> {
  const url = `${aiDomain}/query`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-store',
    headers: headers,
    body: JSON.stringify(payload),
  });
  if (response.status >= 300 || response.status < 200) {
    throw 'server error';
  }
  const data = await response.json();
  return data as Conversation;
}

export async function deleteConversations(
  userId: number,
  courseId: number,
  chapterId: number
): Promise<string> {
  const url = `${aiDomain}/conversations?user_id=${userId}&course_id=${courseId}&chapter_id=${chapterId}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    method: 'DELETE',
    cache: 'no-store',
    headers: headers,
  });
  if (response.status >= 300 || response.status < 200) {
    throw 'server error';
  }
  return 'deleted';
}