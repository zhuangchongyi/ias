CREATE DATABASE `ias` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';

use ias;

drop table if exists sys_user;
CREATE TABLE sys_user
(
    id        bigint PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
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
    create_id bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT ='用户表';



insert into sys_user(id, username, password, nickname, avatar)
values (1, 'admin', '$2a$10$agPA/b0ntfiEEMHm51OIs.tx/NQxUyoIUwor95BfoafmMw9iltJQS', '系统管理员',
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png')
;

drop table if exists sys_role;
create table sys_role
(
    id          bigint auto_increment primary key comment '角色ID',
    role_key    varchar(100) not null comment '角色权限字符串',
    role_name   varchar(30)  not null comment '角色名称',
    order_num   int        default 1 comment '显示顺序',
    status      tinyint(1) comment '角色状态（0禁用 1启用）',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 comment '角色表';

drop table if exists sys_dept;
create table sys_dept
(
    id          bigint auto_increment primary key comment '部门id',
    parent_id   bigint     default 0 comment '父部门id',
    ancestors   varchar(100) comment '祖级列表',
    dept_name   varchar(30) comment '部门名称',
    order_num   int comment '显示顺序',
    status      tinyint(1) comment '部门状态（0禁用 1启用）',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 comment '部门表';

drop table if exists sys_file;
create table sys_file
(
    id          bigint primary key comment '文件ID',
    file_name   varchar(200) comment '文件名称',
    file_size   bigint comment '文件大小(B)',
    file_type   varchar(20) comment '文件类型',
    file_id     varchar(255) comment '文件哈希值ID',
    file_data   longblob comment '文件数据',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) comment '文件表';

drop table if exists sys_user_face;
create table sys_user_face
(
    id          bigint auto_increment primary key comment 'ID',
    user_id     bigint comment '用户ID',
    file_url    varchar(255) comment '文件地址url',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) comment '用户人脸记录表';

