package com.wordtree.directory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DireotoryRepository extends JpaRepository<Directory,Long> {
}
