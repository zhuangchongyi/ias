drop table if exists sys_user;
CREATE TABLE sys_user
(
    id          bigint PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
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
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT ='用户表';

insert into sys_user(id, username, password, nickname, avatar)
values (1, 'admin', '$2a$10$agPA/b0ntfiEEMHm51OIs.tx/NQxUyoIUwor95BfoafmMw9iltJQS', '系统管理员',
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png');

drop table if exists sys_role;
create table sys_role
(
    id          bigint auto_increment primary key comment '角色ID',
    role_key    varchar(100) not null comment '角色权限字符串',
    role_name   varchar(30)  not null comment '角色名称',
    order_num   int        default 1 comment '显示顺序',
    status      tinyint(1) default 1 comment '角色状态（0禁用 1启用）',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 comment = '角色表';

insert into sys_role(id, role_key, role_name, order_num, status)
values (1, 'admin', '系统管理员', 1, 1);

drop table if exists sys_dept;
create table sys_dept
(
    id          bigint auto_increment primary key comment '部门id',
    parent_id   bigint     default 0 comment '父部门id',
    ancestors   varchar(100) comment '祖级列表',
    dept_name   varchar(30) comment '部门名称',
    order_num   int comment '显示顺序',
    status      tinyint(1) default 1 comment '部门状态（0禁用 1启用）',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 comment = '部门表';

insert into sys_dept(id, parent_id, dept_name, order_num, status)
values (1, 0, '总公司', 1, 1);

drop table if exists sys_permission;
create table sys_permission
(
    id              bigint auto_increment primary key comment '权限ID',
    parent_id       bigint     default 0 comment '父级id',
    permission_key  varchar(100) not null comment '权限字符串',
    permission_name varchar(100) not null comment '权限名称',
    order_num       int        default 1 comment '显示顺序',
    create_id       bigint COMMENT '创建人ID',
    create_by       VARCHAR(50) COMMENT '创建人名称',
    create_time     DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id       bigint COMMENT '更新人ID',
    update_by       VARCHAR(50) COMMENT '更新人名称',
    update_time     DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag        tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 comment ='权限表';

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
) comment = '文件表';

drop table if exists sys_user_face;
create table sys_user_face
(
    id          bigint auto_increment primary key comment 'ID',
    user_id     bigint comment '用户ID',
    file_url    varchar(255) comment '文件地址url',
    face_id     varchar(36) comment '人脸数据ID',
    create_id   bigint COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id   bigint COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag    tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）',
    FOREIGN KEY (user_id) REFERENCES sys_user (id)
) COMMENT = '用户人脸记录表';

drop table if exists sys_record_attendance;
CREATE TABLE sys_record_attendance
(
    id           bigint auto_increment primary key comment 'ID',
    user_id      bigint     not null comment '用户ID',
    punch_source tinyint(1) not null COMMENT '打卡来源（1自动 2补卡）',
    punch_type   tinyint(1) not null COMMENT '打卡类型（1上班打卡 2迟到打卡 3下班打卡）',
    punch_mode   tinyint(1) not null COMMENT '打卡方式（1人脸打卡 2定位打卡）',
    punch_time   DATETIME   not null COMMENT '打卡时间',
    face_id      varchar(36) comment '人脸打卡时的人脸数据ID',
    location     VARCHAR(255) COMMENT '打卡位置（用于定位打卡）',
    create_id    bigint COMMENT '创建人ID',
    create_by    VARCHAR(50) COMMENT '创建人名称',
    create_time  DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id    bigint COMMENT '更新人ID',
    update_by    VARCHAR(50) COMMENT '更新人名称',
    update_time  DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag     tinyint(1) DEFAULT 0 COMMENT '是否删除（0否 1是）',
    FOREIGN KEY (user_id) REFERENCES sys_user (id)
) COMMENT ='打卡记录表';

DROP TABLE IF EXISTS sys_record_repair;
CREATE TABLE sys_record_repair
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
    user_id       BIGINT     NOT NULL COMMENT '用户ID',
    attendance_id BIGINT     NOT NULL COMMENT '打卡记录ID',
    repair_type   TINYINT(1) NOT NULL COMMENT '补卡类型（1上班 2下班）',
    repair_time   DATETIME   NOT NULL COMMENT '补卡时间',
    reason        VARCHAR(255) COMMENT '补卡原因',
    status        TINYINT(1) DEFAULT 0 COMMENT '审核状态（0待审核 1已通过 2已拒绝）',
    create_id     BIGINT COMMENT '创建人ID',
    create_by     VARCHAR(50) COMMENT '创建人名称',
    create_time   DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id     BIGINT COMMENT '更新人ID',
    update_by     VARCHAR(50) COMMENT '更新人名称',
    update_time   DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag      TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）',
    FOREIGN KEY (attendance_id) REFERENCES sys_record_attendance (id),
    FOREIGN KEY (user_id) REFERENCES sys_user (id)
) COMMENT = '补卡记录表';


drop table if exists sys_user_role;
create table sys_user_role
(
    user_id bigint NOT NULL comment '用户ID',
    role_id bigint NOT NULL comment '角色ID',
    FOREIGN KEY (user_id) REFERENCES sys_user (id),
    FOREIGN KEY (role_id) REFERENCES sys_role (id)
) AUTO_INCREMENT = 1000 comment ='用户角色表';

drop table if exists sys_user_dept;
create table sys_user_dept
(
    user_id bigint NOT NULL comment '用户ID',
    dept_id bigint NOT NULL comment '部门ID',
    FOREIGN KEY (user_id) REFERENCES sys_user (id),
    FOREIGN KEY (dept_id) REFERENCES sys_dept (id)
) AUTO_INCREMENT = 1000 comment = '用户部门表';

drop table if exists sys_role_permission;
create table sys_role_permission
(
    role_id       bigint NOT NULL comment '角色ID',
    permission_id bigint NOT NULL comment '权限ID',
    FOREIGN KEY (role_id) REFERENCES sys_role (id),
    FOREIGN KEY (permission_id) REFERENCES sys_permission (id)
) AUTO_INCREMENT = 1000 COMMENT = '角色权限表';