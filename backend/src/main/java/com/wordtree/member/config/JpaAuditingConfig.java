package com.wordtree.member.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// Entity의 CreatedDate, LastModifiedDate를 위한 Config를 등록
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}