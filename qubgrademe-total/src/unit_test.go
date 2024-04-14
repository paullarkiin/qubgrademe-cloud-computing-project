package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Monitoring_API(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/monitor", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	assert.True(t, strings.Contains(w.Body.String(), "\"serverHealth\":\"OK\""))
	assert.True(t, strings.Contains(w.Body.String(), "date"))
	assert.True(t, strings.Contains(w.Body.String(), "serverUpTime"))
}

func Test_API_With_Valid_Values(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/?module_1=One&module_2=Two&module_3=Five&module_4=Three&module_5=Seven&mark_1=1&mark_2=2&mark_3=5&mark_4=3&mark_5=7", nil)
	router.ServeHTTP(w, req)

	want := "{\"error\":false,\"errorMessage\":\"\",\"func\":\"total\",\"marks\":[\"1\",\"2\",\"5\",\"3\",\"7\"],\"modules\":[\"One\",\"Two\",\"Five\",\"Three\",\"Seven\"],\"total\":18}"

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, want, w.Body.String())
}

func Test_API_With_Invalid_Values(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/?module_1=One&module_2=Two&module_3=Five&module_4=Three&module_5=Seven&mark_1=1&mark_2=2&mark_3=5&mark_4=3&mark_5=", nil)
	router.ServeHTTP(w, req)

	want := "{\"error\":true,\"errorMessage\":\"Mark is missing, please provide valid marks\",\"func\":\"total\",\"marks\":[\"1\",\"2\",\"5\",\"3\",\"\"],\"modules\":[\"One\",\"Two\",\"Five\",\"Three\",\"Seven\"],\"total\":0}"
	assert.Equal(t, 400, w.Code)
	assert.Equal(t, want, w.Body.String())
}

func Test_API_With_No_Values_Past(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/", nil)
	router.ServeHTTP(w, req)

	want := "{\"error\":true,\"errorMessage\":\"Mark is missing, please provide valid marks\",\"func\":\"total\",\"marks\":[\"\",\"\",\"\",\"\",\"\"],\"modules\":[\"\",\"\",\"\",\"\",\"\"],\"total\":0}"

	assert.Equal(t, 400, w.Code)
	assert.Equal(t, want, w.Body.String())
}
