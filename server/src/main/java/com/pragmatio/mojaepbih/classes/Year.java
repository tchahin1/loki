package com.pragmatio.mojaepbih.classes;

import lombok.Data;

@Data
public class Year {
    Integer year;

    public Year(Integer year) {
        this.year = year;
    }
}
