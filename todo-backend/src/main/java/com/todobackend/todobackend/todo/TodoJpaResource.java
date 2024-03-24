package com.todobackend.todobackend.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.todobackend.todobackend.todorepository.TodoRepository;

@RestController
public class TodoJpaResource {

	private TodoRepository todoRepository;

	public TodoJpaResource(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	@GetMapping(path="/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoRepository.findByUsername(username);
	}

	@GetMapping(path="/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username, @PathVariable int id) {
//		return todoRepository.findById(id);
		return todoRepository.findById(id).get();
	}
	
	@DeleteMapping(path="/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable Integer id){
		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(path="/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username, @PathVariable Integer id, @RequestBody Todo todo){
		todoRepository.save(todo);
//		todoRepository.updateTodo(todo);
		return todo;
	}
	
	@PostMapping(path="/users/{username}/todos")
	public Todo createTodo(@PathVariable String username, @RequestBody Todo todo){
		todo.setUsername(username);
		todo.setId(null);
		return todoRepository.save(todo);
//		Todo createdTodo = todoRepository.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
//		return todo;
	}
}


