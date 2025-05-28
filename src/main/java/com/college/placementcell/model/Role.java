package com.college.placementcell.model;

public enum Role {
    ADMIN("Administrator"),
    STUDENT("Student"),
    COMPANY("Company Representative");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
