CREATE DATABASE `ias` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';

use ias;

drop table if exists sys_user;
CREATE TABLE sys_user
(
    id          INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username    VARCHAR(50)  NOT NULL COMMENT '用户名',
    password    VARCHAR(255) NOT NULL COMMENT '密码',
    nickname    VARCHAR(50) COMMENT '昵称',
    avatar      VARCHAR(255) COMMENT '头像',
    email       VARCHAR(50) COMMENT '邮箱',
    phone       VARCHAR(20) COMMENT '手机号',
    gender      tinyint(1) COMMENT '性别（1男 2女）',
    status      tinyint(1) DEFAULT 1 COMMENT '帐号状态（0禁用 1启用）',
    login_ip    varchar(128) null comment '最后登录IP',
    login_date  datetime     null comment '最后登录时间',
    create_id   INT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   INT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='系统用户表';



insert into sys_user(id, username, password, nickname, avatar)
values (1, 'root', '$2a$10$agPA/b0ntfiEEMHm51OIs.tx/NQxUyoIUwor95BfoafmMw9iltJQS', '管理员',
        CONCAT('https://avatars.githubusercontent.com/', FLOOR(RAND() * 100) + 1));


