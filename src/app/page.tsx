"use client";

import { useEffect, useState } from "react";
import { Container } from "./styles";
import { api } from "@/lib/axios";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      console.log('users -> ', response.data);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <h1>Loading users...</h1>
      ) : (
        <>
          <h1>Users</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
