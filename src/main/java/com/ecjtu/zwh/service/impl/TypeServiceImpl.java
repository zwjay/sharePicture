package com.ecjtu.zwh.service.impl;

import com.ecjtu.zwh.entity.Type;
import com.ecjtu.zwh.mapper.TypeMapper;
import com.ecjtu.zwh.service.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {
    @Autowired
    private TypeMapper typeMapper;

    @Override
    public List<Type> getAllType() {
        return typeMapper.getAllType();
    }

    @Override
    public List<String> getAllTypeName() {
        return typeMapper.getAllTypeName();
    }

    @Override
    public String getTypeNameByTypeId(Integer typeId) {
        return null;
    }
}
