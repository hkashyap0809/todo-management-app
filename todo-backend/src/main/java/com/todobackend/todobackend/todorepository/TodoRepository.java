package com.todobackend.todobackend.todorepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todobackend.todobackend.todo.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer>{
	public List<Todo> findByUsername(String username);
	

}
