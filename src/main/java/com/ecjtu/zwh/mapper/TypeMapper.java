package com.ecjtu.zwh.mapper;

import com.ecjtu.zwh.entity.Type;

import java.util.List;

public interface TypeMapper {
    // 查询所有类型
    List<Type> getAllType();

    // 查询所有类型
    List<String> getAllTypeName();

    // 通过 typeId 查询该类型名
    String getTypeNameByTypeId(Integer typeId);

}
